use serde_derive::{Deserialize, Serialize};

// #![deny(
//     missing_debug_implementations,
//     missing_docs,
//     unsafe_code,
//     bare_trait_objects
// )]

#[macro_use]
extern crate exonum_derive;
#[macro_use]
extern crate failure;
extern crate serde;
#[macro_use]
extern crate protobuf;
#[macro_use]
extern crate serde_derive; // Required for Protobuf.

pub mod proto;

pub mod manufacturer;
pub mod owner;
pub mod product;
pub mod schema;
pub mod transactions;
pub mod api;
pub use crate::{schema::Schema, transactions::CounterfeitInterface};

use exonum::runtime::{ExecutionContext, ExecutionError, InstanceId};
use exonum_rust_runtime::{api::ServiceApiBuilder, DefaultInstance, Service};
use crate::{api::PublicApi as CounterfeitApi, schema::SchemaImpl};
use exonum_derive::ServiceDispatcher;

#[derive(Debug, ServiceFactory, ServiceDispatcher)]
#[service_dispatcher(implements("CounterfeitInterface"))]
#[service_factory(proto_sources = "crate::proto")]
pub struct CounterfeitService;

impl Service for CounterfeitService {
    fn wire_api(&self, builder: &mut ServiceApiBuilder) {
            CounterfeitApi::wire(builder);
        }
}
impl DefaultInstance for CounterfeitService {
    const INSTANCE_ID: InstanceId = 3;
    const INSTANCE_NAME: &'static str = "counterfeit";
}
// impl Service for CounterfeitService {
//     // fn wire_api(&self, builder: &mut ServiceApiBuilder) {
//     //     CounterfeitApi::wire(builder);
//     // }
// }
// impl DefaultInstance for CounterfeitService {
//     const INSTANCE_ID: u32 = 101;
//     const INSTANCE_NAME: &'static str = "counterfeit";
// }

// #[derive(Debug, ServiceFactory)]
// #[service_dispatcher(implements("CounterfeitInterface"))]
// #[service_factory(artifact_name = "counterfeit", proto_sources = "proto")]
// pub struct CounterfeitService;

// impl Service for CounterfeitService {
//     fn initialize(
//         &self,
//         context: ExecutionContext<'_>,
//         _params: Vec<u8>,
//     ) -> Result<(), ExecutionError> {
//         // Initialize indexes. Not doing this may lead to errors in HTTP API, since it relies on
//         // `wallets` indexes being initialized for returning corresponding proofs.
//         SchemaImpl::new(context.service_data());
//         Ok(())
//     }

//     fn wire_api(&self, builder: &mut ServiceApiBuilder) {
//         CounterfeitApi::wire(builder);
//     }
// }
// impl DefaultInstance for CounterfeitService {
//     const INSTANCE_ID: InstanceId = 3;
//     const INSTANCE_NAME: &'static str = "counterfeit";
// }