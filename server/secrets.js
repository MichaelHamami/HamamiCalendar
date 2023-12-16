
import dotenv from 'dotenv'
dotenv.config();


export const SECRETS = {
    CONNECTION_URL:process.env.CONNECTION_URL,
    PORT:process.env.PORT,
    email_server_user:process.env.email_server_user,
    email_app_password:process.env.email_app_password,
    secret:process.env.secret
}