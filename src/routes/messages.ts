import express, { Request, Response } from 'express';
import { supabase } from '../supabaseClient';

const router = express.Router();

router.get('/random', async (req: Request, res: Response): Promise<void> => {
    try {
        const { data, error } = await supabase
        .from('Mensagens') // A tabela é referenciada como string
        .select('*');

        if (error) {
        console.error('Erro ao buscar mensagens:', error);
        res.status(500).json({ error: 'Erro ao buscar mensagens.' });
        return;
        }

        if (data && data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomMessage = data[randomIndex];
        res.status(200).json(randomMessage);
        } else {
        res.status(404).json({ message: 'Nenhuma mensagem disponível.' });
        }
    } catch (error) {
        console.error('Erro inesperado:', error);
        res.status(500).json({ error: 'Erro inesperado.' });
    }
});

export default router;
