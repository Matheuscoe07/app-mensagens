import { createClient } from '@supabase/supabase-js';

const supabase = createClient('SUPABASE_URL', 'SUPABASE_ANON_KEY'); // Substitua pelas suas credenciais

// Definindo o tipo para a mensagem
interface Message {
    id: number;
    mensagem: string;
    ref: string;
}

// Função para pegar uma mensagem aleatória
export const getRandomMessage = async (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): any; new(): any; }; }; json: (arg0: { id: any; content: any; author: any; }) => any; }) => {
    try {
    const { data, error } = await supabase
        .from('Mensagens')
        .select('*')
        .limit(10); // Limita para 10 mensagens para escolher aleatoriamente no backend

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    if (data && data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomMessage = data[randomIndex];

        return res.json({
            id: randomMessage.id,
            content: randomMessage.mensagem,
            author: randomMessage.ref || 'Autor desconhecido',
        });
    } else {
        return res.status(404).json({ error: 'Nenhuma mensagem encontrada.' });
    }
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar mensagem.' });
    }
};
