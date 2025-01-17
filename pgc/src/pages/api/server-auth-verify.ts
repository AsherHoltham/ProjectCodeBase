import type { NextApiRequest, NextApiResponse } from 'next';
import DataBase from '../../lib/db/DataBase';
import { User } from '../../types';

type Data = {
    message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) 
{
    console.log("Attempting to PUT data to the database");
    try {
        if (req.method === 'PUT') {
            const {field, value, collection} = req.body;
        
            // Validate the input
            if (!field || !value || !collection) {
              return res.status(400).json({ message: 'Missing required fields' });
            }
    
            console.log("Field: ", field, "Value: ", value, "Type: ", collection);
            /// const T = decodedType.slice(0, -1) maybe implement later to univeralize
    
            // Initialize database instance
            const dbInstance = DataBase.getInstance("PGC");
            await dbInstance.initDb<User>(['_uname', '_email'], 'User');
    
            console.log("Database instance initialized"); //////////////////////////////////////// ####
    
            const oldUser = await dbInstance.requestDocument<User>('User', field, value);
            const userJson = JSON.stringify(oldUser);
            console.log("Pulled oldUser instance fromDB"); //////////////////////////////////////// ####
    
            const {_uname, _password, _email, _trips, _verified, _verificationCode} = JSON.parse(userJson);
            await dbInstance.removeDocument('User', '_email', _email);
            console.log("remove old user instance from DB but saved data"); //////////////////////////////////////// ####
    
            //const newUser = new User(_uname, _password, _email, _trips, _verified, _verificationCode);
            //newUser.updateVerificationStatus();
            console.log("Created New user and Update Verification status"); //////////////////////////////////////// ####
    
            //await dbInstance.addDocument<User>('User', newUser.toDB());
            console.log("Add new user to DB"); //////////////////////////////////////// ####
            return res.status(200).json({ message: 'User verified successfully' });
        }
    } catch (error: any) {
        console.error('PUT Query Error:', error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}