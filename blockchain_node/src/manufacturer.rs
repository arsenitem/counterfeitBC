use exonum::crypto::{Hash, PublicKey};

use super::proto;

/// Client information stored in the database.
#[derive(Clone, Debug, ProtobufConvert)]
#[exonum(pb = "proto::Manufacturer", serde_pb_convert)]
pub struct Manufacturer {
    /// Public key of the manufacturer
    pub manufacturer_public_key: PublicKey,        
    /// Name of the manufacturer.
    pub manufacturer_name: String,      
    /// Information about the manufacturer
    pub manufacturer_info: String, 
}

impl Manufacturer {
    /// Create new manufacturer
    pub fn new(
        &manufacturer_public_key: &PublicKey,       
        manufacturer_name: &String,        
        manufacturer_info: &String,        
                        
    ) -> Self {
        Self {
            manufacturer_public_key,         
            manufacturer_name: manufacturer_name.to_owned(),            
            manufacturer_info: manufacturer_info.to_owned(),
        }
    }
}