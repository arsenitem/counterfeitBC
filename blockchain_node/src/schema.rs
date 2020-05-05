
use exonum::crypto::Hash;
use exonum::crypto::PublicKey;
use exonum::merkledb::{
    access::{Access, FromAccess, RawAccessMut},
    Group, ObjectHash, ProofListIndex, RawProofMapIndex,
};
use exonum::runtime::CallerAddress as Address;
use exonum_derive::{FromAccess, RequireArtifact};

use crate::{product::Product};

/// Database schema for the counterfeitBC.
#[derive(Debug, FromAccess)]
pub(crate) struct SchemaImpl<T: Access> {
    /// Public part of the schema.
    #[from_access(flatten)]
    pub public: Schema<T>,
    /// History for specific products.
    pub product_history: Group<T, PublicKey, ProofListIndex<T::Base, Hash>>,
}

/// Public part of the schema.
#[derive(Debug, FromAccess, RequireArtifact)]
pub struct Schema<T: Access> {
    /// Map of products keys to information about the corresponding product.
    pub products: RawProofMapIndex<T::Base, PublicKey, Product>,
}

impl<T: Access> SchemaImpl<T> {
    pub fn new(access: T) -> Self {
        Self::from_root(access).unwrap()
    }

    pub fn product(&self, pk: PublicKey) -> Option<Product> {
        self.public.products.get(&pk)
    }
}

impl<T> SchemaImpl<T>
where
    T: Access,
    T::Base: RawAccessMut,
{
    /// Creates a new product and append first record to its history.
    pub fn create_product(&mut self,
        product_public_key: PublicKey, 
        manufacturer_public_key : PublicKey,   
        owner_public_key: PublicKey,     
        product_name: &str,
        last_scan_coord: &str,
        product_info: &str,
        product_nfc: &str,     
        production_date: &str,
        transaction: Hash) {
        let mut history = self.product_history.get(&product_public_key);
        history.push(transaction);
        let history_hash = history.object_hash();
        let product = Product::new(&product_public_key,
             manufacturer_public_key,
             owner_public_key, 
             product_name,
             last_scan_coord,
             product_info,
             product_nfc,
             production_date,
              &history_hash);
        self.public.products.put(&product_public_key, product);
    }
}
