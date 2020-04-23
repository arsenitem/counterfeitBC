import { IUserLogin , IUser, IUserSignUp} from "../models";
import {callApi} from '../utils/callApi'
import {endpoints} from '../apiConfig'

export class IdentityService {

    public async loginUser(userData: IUserLogin): Promise<{accessToken: string, user: IUser}> {
        await new Promise(res => setTimeout(res, 1000))

        // call "identity/login" route and POST user login data
        return {
            accessToken: '',
            user: {
                email: 'meatymail@gmail.com',
                name: 'Бык',
                surname: 'Буйлович'
            }
        }

    }
    public async signUpUser(userData: IUserSignUp): Promise<{accessToken: string, user: IUser}> {
        await new Promise(res => setTimeout(res, 1000))

        // call "identity/signup" route and POST user signup data
        return {
            accessToken: '',
            user: {
                email: 'meatymail@gmail.com',
                name: 'Бык',
                surname: 'Буйлович'
            }
        }

    }
    public async getUserData(accessToken: string): Promise<IUser> {
        await new Promise(res => setTimeout(res, 500))

        // call "identity/user" route and GET user data
        return {
            email: 'meatymail@gmail.com',
            name: 'Бык',
            surname: 'Буйлович'
        }
    }
}