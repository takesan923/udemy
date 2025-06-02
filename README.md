## 概要
SNS風のWebアプリ

## 使用技術（Tech Stack）

- フロントエンド: React (v18)
- バックエンド: Node.js (v18), Express
- データベース: MongoDB (Atlas)
- その他: Mongoose, Nodemon


## 環境構築手順

### 1. 開発環境
- Node.js v22.15.0
- npm v10.9.2
- MongoDB（Atlas）

### 2. リポジトリをクローン

```bash
git clone https://github.com/ユーザー名/リポジトリ名.git
cd リポジトリ名
```

### 3. パッケージのインストール

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 4. 環境変数の設定
backend/.env を作成して以下のように記述：
```env
# MongoDB Atlas の接続文字列を指定
MONGOURL=mongodb+srv://<ユーザー名>:<パスワード>@<クラスター名>.mongodb.net/<データベース名>?retryWrites=true&w=majority
```
※補足　.env ファイルが .gitignore に含まれていることを確認してください

### 5. サーバー起動
バックエンド（Node.js）
```bash
cd backend
npm start
```
フロントエンド（React）
```bash
cd frontend
npm start
```
