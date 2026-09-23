Google翻訳API(v3)使用方法

ディレクトリ構成
├── assets jsやcss
├── en     英語に翻訳されたhtmlを格納
├── ja     日本語（これをもとに翻訳する）
├── ko     韓国語
├── zh-cn  中国語（簡体字）
└── zh-tw  中国語（繁体字）


事前準備
・phpをwslにインストール
sudo apt update
sudo apt install php php-dom php-mbstring php-curl
・Google CloudでTranslation利用のための各種設定を行い取得したJSONキーをwsl内に配置し環境変数をセットする
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/some_service.json

実行例(日本語index.htmlを英語に翻訳)
php translate_dom_full.php ja/index.html en/index.html ja en
