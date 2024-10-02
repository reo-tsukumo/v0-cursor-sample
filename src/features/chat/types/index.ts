// チャット機能で使用する型定義をまとめたファイル

// メッセージの型定義
export type Message = {
  id: number;        // メッセージの一意のID
  content: string;   // メッセージの内容
  sender: 'user' | 'bot';  // メッセージの送信者（ユーザーまたはボット）
};

// 生成されたコンテンツ（アーティファクト）の型定義
export type Artifact = {
  id: number;        // アーティファクトの一意のID
  title: string;     // アーティファクトのタイトル
  content: string;   // アーティファクトの内容
};

// チャットの状態を表す型定義
export interface ChatState {
  messages: Message[];       // チャットのメッセージ履歴
  artifacts: Artifact[];     // 生成されたアーティファクトのリスト
  currentArtifactId: number | null;  // 現在表示中のアーティファクトのID（nullの場合は何も選択されていない）
}