import request from "supertest";
import app from "../src/app";

describe("Branch API", () => {
    let branchId: string;

    it("should create a new branch", async () => {
        const response = await request(app)
            .post("/api/v1/branches")
            .send({
                name: "Downtown Branch",
                address: "123 Main St, City, Country",
                phone: "123-456-7890"
            });

        expect(response.status).toBe(201);
        expect(response.body.data.id).toBeDefined();
        branchId = response.body.data.id;
    });

    it("should get all branches", async () => {
        const response = await request(app).get("/api/v1/branches");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBeTruthy();
    });

    it("should get a branch by ID", async () => {
        const response = await request(app).get(`/api/v1/branches/${branchId}`);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(branchId);
    });

    it("should update a branch", async () => {
        const response = await request(app)
            .put(`/api/v1/branches/${branchId}`)
            .send({ address: "456 Elm St, New City, Country" });

        expect(response.status).toBe(200);
        expect(response.body.data.address).toBe("456 Elm St, New City, Country");
    });

    it("should delete a branch", async () => {
        const response = await request(app).delete(`/api/v1/branches/${branchId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Branch Deleted");
    });

    it("should return 404 for a non-existing branch", async () => {
        const response = await request(app).get("/api/v1/branches/non-existing-id");
        expect(response.status).toBe(404);
    });
});
