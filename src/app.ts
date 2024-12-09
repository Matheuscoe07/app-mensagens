import 'dotenv/config'; // Carrega as variáveis de ambiente do .env
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors'; // Middleware para habilitar CORS
import messagesRoutes from './routes/messages'; // Rotas de mensagens

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para habilitar CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || '*', // Substitua pelo URL do front-end se necessário
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware para interpretar JSON no body das requisições
app.use(express.json());

// Rotas principais
app.use('/api/messages', messagesRoutes);

// Middleware de tratamento de erros globais
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Erro global:', err.message);
    res.status(500).json({ error: 'Erro interno no servidor' });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
