import db from "../database";

describe('Database Variables Test', () => {
    it('should have a db variable', () => {
        expect(db).toBeDefined();
    });
    it('should connect with environment variables', async () => {
        const conn = await db.connect();
        expect(conn).toBeDefined();
    });
});