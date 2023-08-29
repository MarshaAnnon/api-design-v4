import * as user from '../user'

describe('user', () => {
    it('should create a new user', async () => {
        const req = {body: {username: 'johndoe', password: 'password'}}
        const res = {json({token}) {
            expect(token).toBeTruthy();
        }}

        await user.createUser(req, res, () => {})
    });
});

