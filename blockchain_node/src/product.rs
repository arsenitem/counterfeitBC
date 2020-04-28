use exonum::{crypto::Hash, runtime:: CallerAddress as Address};
use exonum_proto::ProtobufConvert;
use exonum_derive::{BinaryValue, ObjectHash};
use super::proto;


/// Product information stored in the database.
#[derive(Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::Product", serde_pb_convert)]
pub struct Product {
    /// Address of the wallet's owner. This address may translate to a Ed25519 public key,
    /// or to service authorization.
   /// pub product: Address,
    /// `PublicKey` of the manufacturer.
    pub manufacturer_public_key : Address,
    /// Public key of the owner
    pub owner_public_key: Address,
    /// Name of the product.
    pub product_name: String,   
    /// Coordinates of the last scan    
    pub last_scan_coord: String,  
    /// Information about the product
    pub product_info: String,
    /// Id of the nf chip
    pub product_nfc: String,
    /// Date of production
    pub production_date: String,
    /// Length of the transactions history.
    pub history_len: u64,
    /// Hash of the transactions history
    pub history_hash: Hash,
      
}

impl Product {
    /// Create new product
    pub fn new(           
        manufacturer_public_key : Address,   
        owner_public_key: Address,     
        product_name: &String,
        last_scan_coord: &String,
        product_info: &String,
        product_nfc: &String,     
        production_date: &String,
        history_len: u64,
        &history_hash: &Hash,
                
    ) -> Self {
        Self {
            manufacturer_public_key,
            owner_public_key,
            product_name,
            last_scan_coord,
            product_info,
            product_nfc,    
            production_date,  
            history_len,
            history_hash,                
        }
    }


pub fn set_product(self, owner_public_key: Address, manufacturer_public_key: Address, history_hash: &Hash) -> Self{
    Self::new(
        self.owner_public_key,
        self.manufacturer_public_key,         
        &self.product_name,
        &self.last_scan_coord,
        &self.product_info,
        &self.product_nfc,     
        &self.production_date,
        self.history_len + 1,
        history_hash,
    )
}
}