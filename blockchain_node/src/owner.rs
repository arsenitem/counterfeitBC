use exonum::{crypto::PublicKey};
use exonum_proto::ProtobufConvert;

use super::proto;

/// Wallet information stored in the database.
#[derive(Clone, Debug, ProtobufConvert)]
#[protobuf_convert(source = "proto::Owner", serde_pb_convert)]
pub struct Owner {
    pub owner_public_key: PublicKey,        
    /// Name of the manufacturer.
    pub owner_name: String,      
    /// Information about the manufacturer
    pub owner_info: String, 
}

impl Owner {
    /// Create new owner
    pub fn new(
        &owner_public_key: &PublicKey,       
        owner_name: &String,        
        owner_info: &String,        
                        
    ) -> Self {
        Self {
            owner_public_key,         
            owner_name: owner_name.to_owned(),            
            owner_info: owner_info.to_owned(),
        }
    }
}