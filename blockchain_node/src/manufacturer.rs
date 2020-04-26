use exonum::{crypto::PublicKey};
use exonum_proto::ProtobufConvert;

use super::proto;

/// Wallet information stored in the database.
#[derive(Clone, Debug, ProtobufConvert)]
#[protobuf_convert(source = "proto::Manufacturer", serde_pb_convert)]
pub struct Manufacturer {
    manufacturer_public_key: PublicKey,
    manufacturer_name: String,
    manufacturer_info: String,
}

impl Manufacturer {
    /// Creates a new manufacturer.
    pub fn new(
        &manufacturer_public_key: &PublicKey,
        manufacturer_name: &str,
        manufacturer_info: &str
    ) -> Self {
        Self {
            manufacturer_public_key,
            manufacturer_name: manufacturer_name.to_owned(),
            manufacturer_info: manufacturer_info.to_owned(),
        }
    }
}