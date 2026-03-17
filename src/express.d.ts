
// ?
interface ITokenPayload {
    userId: string;
    name: string;
}
// *
declare namespace Express {
    interface Request {
        user?: ITokenPayload;
    }

}