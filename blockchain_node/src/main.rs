use exonum_cli::{NodeBuilder, Spec};
use counterfeitBC::CounterfeitService;
use failure::Error;
fn main() -> Result<()> {
    exonum::helpers::init_logger();
    NodeBuilder::development_node().with_default_rust_service(CounterfeitService).run();
}