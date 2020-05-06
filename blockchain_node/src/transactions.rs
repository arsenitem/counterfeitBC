use exonum::{
    crypto::Hash,
    crypto::PublicKey,
    crypto::gen_keypair,
    runtime::{CallerAddress as Address, CommonError, ExecutionContext, ExecutionError},
};
use exonum_derive::{exonum_interface, interface_method, BinaryValue, ExecutionFail, ObjectHash};
use exonum_proto::ProtobufConvert;

use super::{proto, schema::SchemaImpl, CounterfeitService};

// /// Error codes emitted transactions during execution.
// #[derive(Debug, ExecutionFail)]
// pub enum Error {
// }

/// Create product
#[derive(Clone, Debug)]
#[derive(ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::CreateProduct", serde_pb_convert)]
pub struct CreateProduct {
    /// Address of receiver's wallet.
    pub manufacturer_public_key: PublicKey,
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
}


impl CreateProduct {
    /// Creates wallet info based on the given `name`.
    pub fn new(manufacturer_public_key: impl Into<PublicKey>,
        owner_public_key:impl Into<PublicKey>,
        product_name:impl Into<String>,
        last_scan_coord:impl Into<String>,
        product_info:impl Into<String>,
        product_nfc:impl Into<String>,
        production_date:impl Into<String>,
    ) -> Self {
        Self { manufacturer_public_key: manufacturer_public_key.into(),
            owner_public_key: owner_public_key.into(),
            product_name: product_name.into(),
            last_scan_coord: last_scan_coord.into(),
            product_info: product_info.into(),
            product_nfc: product_nfc.into(),
            production_date: production_date.into()
         }
    }
}

/// service transactions.
#[exonum_interface]
pub trait CounterfeitInterface<Ctx> {
    /// Output returned by the interface methods.
    type Output;

    #[interface_method(id = 0)]
    fn create_product(&self, ctx: Ctx, arg: CreateProduct) -> Self::Output;
}

impl CounterfeitInterface<ExecutionContext<'_>> for CounterfeitService {
    type Output = Result<(), ExecutionError>;

    fn create_product(&self, context: ExecutionContext<'_>, arg: CreateProduct) -> Self::Output {
        let (from, tx_hash) = extract_info(&context)?;
        let (pk, _) = gen_keypair();
        let mut schema = SchemaImpl::new(context.service_data());
        let manufacturer_public_key = arg.manufacturer_public_key;
        schema.create_product(pk, manufacturer_public_key, arg.owner_public_key, &arg.product_name, &arg.last_scan_coord,
            &arg.product_info, &arg.product_nfc, &arg.production_date,tx_hash);
        Ok(())
    }
}

fn extract_info(context: &ExecutionContext<'_>) -> Result<(Address, Hash), ExecutionError> {
    let tx_hash = context
        .transaction_hash()
        .ok_or(CommonError::UnauthorizedCaller)?;
    let from = context.caller().address();
    Ok((from, tx_hash))
}
