use exonum_cli::{NodeBuilder, Spec};
use counterfeitBC::CounterfeitService;
use failure::Error;
#[tokio::main]
async fn main() -> anyhow::Result<()> {
    exonum::helpers::init_logger()?;
    NodeBuilder::new()
        .with(Spec::new(CounterfeitService).with_default_instance())
     .run()
     .await
}