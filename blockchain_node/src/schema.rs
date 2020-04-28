use exonum::merkledb::{
    access::{Access, FromAccess, RawAccessMut},
    Group, ObjectHash, ProofListIndex, RawProofMapIndex,
};
use crate::product::Product;
use crate::manufacturer::Manufacturer;
use crate::owner::Owner;
use exonum::crypto::{Hash, PublicKey};

/// Products table name
pub const Products_TABLE: &str = "counterfeitBC.product";

#[derive(Debug)]
pub struct Schema<T> {
    view: T,
}

impl<T> AsMut<T> for Schema<T> {
    fn as_mut(&mut self) -> &mut T {
        &mut self.view
    }
}

impl<T> Schema<T>
where
    T: IndexAccess,
{
    /// Creates a new schema from the database view.
    pub fn new(view: T) -> Self {
        Schema { view }
    }
    /// Returns `ProofMapIndex` with pipe types.
     pub fn products(&self) -> ProofMapIndex<T, PublicKey, Product> {
        ProofMapIndex::new(Products_TABLE, self.view.clone())
    }

    /// Returns pipe type for the given public key.
    pub fn product(&self, pub_key: &PublicKey) -> Option<Product> {
        self.products().get(pub_key)
    }
    /// Returns the state hash of service.
    pub fn state_hash(&self) -> Vec<Hash> {
        vec![self.queues().object_hash()]
    }   
    ///method for adding attributes to queu
    pub fn create_product (
        &mut self,
        product_public_key: &PublicKey,       
        manufacturer_public_key: PublicKey,
        owner_public_key: PublicKey,    
        product_name: str,
        last_scan_coord: str,
        product_info: str,
        product_nfc: str,
        production_date: str, 
    )  {
        let product = {
            Product:: new(
                product_public_key,       
                manufacturer_public_key,
                owner_public_key,      
                product_name,
                last_scan_coord,
                product_info,
                product_nfc,
                production_date, 
            )
        };
        self.products().put(key, profile);
    }
}