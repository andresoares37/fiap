import type {NextApiRequest, NextApiResponse} from 'next';
import {Login} from '../../types/Login';
import { DefaultResponseMsg } from '../../types/DefautResponseMsg';

export default function handler (req : NextApiRequest, res: NextApiResponse<DefaultResponseMsg>)
{
    try
    {
        if(req.method !== 'POST')
        {
            res.status(400).json({error: 'Metodo solicitado não existe'});
            return;
        }

        if(req.body)
        {
            const body = req.body as Login;        
            if(body.login && body.password
                && body.login === 'admin@admin.com'
                && body.password === 'Admin@123')
            {
                res.status(200).json({msg : 'Login efetuado com sucesso'});
                return;
            }
        }
        //res.status(400).json({error: 'Usuário ou senha inválidos'});        
    }
    catch(e)
    {
        console.log('Ocorreu erro ao autenticar usuario: ', e);
        res.status(500).json({error: 'Ocorreu erro ao autenticar usuario , tente novamente '});
    }
}