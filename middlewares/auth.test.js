const expect = require('chai').expect;
const sinon = require('sinon');

const authMiddleware = require('../middlewares/auth').authMiddleware;
const User = require('../models/user');

// czyszczenie piaskownicy

afterEach(() => {
    sinon.restore()
})

// kluczowa funkcja :)
describe('Auth middleware tests', async function () {
    it('Should return invalid token message if user not exists', async function () {
        let req = {
            query: {
                token: 'Invalid token'
            },
        };
        let res = {
            status(x) {
                console.log('status:', x);
            },
            send(x) {
                console.log('send:', x);
            }
            // send: sinon.fake()
        };
        let next = {};

        sinon.stub(res, 'status').returnsThis(res);

        // szpieguje , daje nam informacje o funkcji
        sinon.spy(res, 'send');

        // stub - zastapienie istniejacej funkcji jakas inna
        //(chcemy nie wywolywac funkcji, ale ma zwracac odpowiednie dane)
        sinon.stub(User, "findUser").resolves(null);

        await authMiddleware(req, res, next);

        expect(res.send.calledOnce).to.be.true
        expect(res.send.getCall(0).args[0]).to.equal("Invalid token");
    })
    it('Should call next', async function () {
        let req = {
            query: {
                token: 123
            },
        };
        let res = {};

        let next = sinon.spy();

        sinon.stub(User, "findUser").resolves({ user: 123 });

        await authMiddleware(req, res, next);

        expect(next.calledOnce).to.be.true;
    })
    it('Should add user to if user exists', async function () {
        let req = {
            query: {
                token: 123
            },
        };
        let res = {};
        let next = sinon.spy();

        sinon.stub(User, "findUser").resolves({ _id: 123 });

        await authMiddleware(req, res, next);

        expect(req.body.uid).to.equal(123);
    })
})