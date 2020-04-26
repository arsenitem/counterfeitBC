# Запуск ноды
Для запуска необходимо:
1. Установить средства сборки С++ https://visualstudio.microsoft.com/ru/downloads/
2. Устновить Rust https://www.rust-lang.org/tools/install
3. Установить protobuf  
Для Windows(через PowerShell):
```
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
choco install -y protoc
```
Для Linux:
```
sudo apt install protobuf-compiler
```
4. Устнановить LLVM https://releases.llvm.org/download.html#10.0.0
5. Собрать и протестировать exonum
```
git clone https://github.com/exonum/exonum.git
cd exonum
cargo test -p exonum
```