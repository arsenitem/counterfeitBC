// use exonum::{
//     crypto::Hash,
//     runtime::{CallerAddress as Address, CommonError, ExecutionContext, ExecutionError},
// };
// use exonum_derive::{exonum_interface, interface_method, BinaryValue, ExecutionFail, ObjectHash};
// use exonum_proto::ProtobufConvert;

// use super::{proto, schema::SchemaImpl, CryptocurrencyService};

// /// Error codes emitted transactions during execution.
// #[derive(Debug, ExecutionFail)]
// pub enum Error {
// }

// /// Create product
// #[derive(Clone, Debug)]
// #[derive(ProtobufConvert, BinaryValue, ObjectHash)]
// #[protobuf_convert(source = "proto::CreateProduct", serde_pb_convert)]
// pub struct CreateProduct {
//     /// Address of receiver's wallet.
//     pub manufacturer_public_key : PublicKey,
//     /// Public key of the owner
//     pub owner_public_key: PublicKey,
//     /// Name of the product.
//     pub product_name: String,   
//     /// Coordinates of the last scan    
//     pub last_scan_coord: String,  
//     /// Information about the product
//     pub product_info: String,
//     /// Id of the nf chip
//     pub product_nfc: String,
//     /// Date of production
//     pub production_date: String,
// }


// impl CreateProduct {
//     /// Creates wallet info based on the given `name`.
//     pub fn new(name: impl Into<String>) -> Self {
//         Self { name: name.into() }
//     }
// }

// /// service transactions.
// #[exonum_interface]
// pub trait Interface<Ctx> {
//     /// Output returned by the interface methods.
//     type Output;

//     #[interface_method(id = 0)]
//     fn create_product(&self, ctx: Ctx, arg: CreateWallet) -> Self::Output;
// }

// impl CryptocurrencyInterface<ExecutionContext<'_>> for CryptocurrencyService {
//     type Output = Result<(), ExecutionError>;

//     fn create_product(&self, context: ExecutionContext<'_>, arg: CreateProduct) -> Self::Output {
//         let (from, tx_hash) = extract_info(&context)?;

//         let mut schema = SchemaImpl::new(context.service_data());
//         if schema.wallet(from).is_none() {
//             let name = &arg.name;
//             schema.create_wallet(from, name, tx_hash);
//             Ok(())
//         } else {
//             Err(Error::WalletAlreadyExists.into())
//         }
//     }
// }

// fn extract_info(context: &ExecutionContext<'_>) -> Result<(Address, Hash), ExecutionError> {
//     let tx_hash = context
//         .transaction_hash()
//         .ok_or(CommonError::UnauthorizedCaller)?;
//     let from = context.caller().address();
//     Ok((from, tx_hash))
// }
