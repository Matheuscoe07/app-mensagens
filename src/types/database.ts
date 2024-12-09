export interface Database {
    public: {
    Tables: {
        Mensagens: {
        Row: {
            id: number;
            mensagem: string;
            ref: string;
        };
        Insert: {
            mensagem: string;
            ref: string;
        };
        Update: {
            mensagem?: string;
            ref?: string;
        };
        };
    };
    };
}