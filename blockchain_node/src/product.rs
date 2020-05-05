use exonum::{crypto::PublicKey, crypto::Hash};
use exonum_proto::ProtobufConvert;

use super::proto;

/// Product information stored in the database.
#[derive(Clone, Debug, ProtobufConvert, BinaryValue)]
#[protobuf_convert(source = "proto::Product", serde_pb_convert)]
pub struct Product {
    /// Public key of the product
    pub product_public_key: PublicKey,
    /// `PublicKey` of the manufacturer.
    pub manufacturer_public_key : PublicKey,
    /// Public key of the owner
    pub owner_public_key: PublicKey,
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

    pub history_hash: Hash,
      
}

impl Product {
    /// Create new product
    pub fn new(
        &product_public_key: &PublicKey,     
        manufacturer_public_key : PublicKey,   
        owner_public_key: PublicKey,     
        product_name: &str,
        last_scan_coord: &str,
        product_info: &str,
        product_nfc: &str,     
        production_date: &str,
        &history_hash: &Hash,
                
    ) -> Self {
        Self {
            product_public_key,
            manufacturer_public_key ,
            owner_public_key,
            product_name: product_name.to_owned(),
            last_scan_coord: last_scan_coord.to_owned(),
            product_info: product_info.to_owned(),
            product_nfc: product_nfc.to_owned(),    
            production_date: production_date.to_owned(),  
            history_hash                
        }
    }
}