import type {NextApiRequest, NextApiResponse} from 'next';
import { UserModel } from '../../models/UserModel';
import {Login} from '../../types/Login';
import { DefaultResponseMsg } from '../../types/DefautResponseMsg';
import connectDB from '../../middlewares/connectDB';
import md5 from 'md5';
import { User } from '../../types/User';

const handler = async (req : NextApiRequest, res: NextApiResponse<DefaultResponseMsg>) =>{
    try
    {
        if(req.method !== 'POST')
        {
            res.status(400).json({error: 'Metodo solicitado não existe'});
            return;
        }

        if(req.body)
        {
            const auth = req.body as Login;        
            if(auth.login && auth.password){
                
                const usersFound = await UserModel.find({email : auth.login, password: md5(auth.password)});
                if(usersFound && usersFound.length > 0){
                    const user = usersFound[0];
                    res.status(200).json(user);
                    return;
                }
            }
        }
        res.status(400).json({error: 'Usuário ou senha inválidos'});        
    }
    catch(e)
    {
        console.log('Ocorreu erro ao autenticar usuario: ', e);
        res.status(500).json({error: 'Ocorreu erro ao autenticar usuario , tente novamente '});
    }
}

export default connectDB(handler);