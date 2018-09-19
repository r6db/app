import { Router } from 'express';
import { Domain } from 'main/domain';

export function makeAuthController(domain: Domain) {
    const r = Router();

    r.get('/', async (_, res) => {
        res.json({
            id: null,
        });
    });
    r.post('/login', async (req, res) => {
        try {
            const auth = await domain.login(req.body);

            return res.json({
                data: {
                    id: auth.profileId,
                    name: auth.nameOnPlatform,
                    platform: auth.platformType,
                },
                error: null,
            });
        } catch (err) {
            return res.status(409).json({
                data: null,
                error: err.message,
            });
        }
    });
    r.post('/logout', async (_, res) => {
        domain.updateState(draft => {
            draft.auth.loginState = 'pending';
        });
        return res.status(200).json({
            error: null,
            data: 'logged out',
        });
    });

    return r;
}
