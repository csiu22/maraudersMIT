describe("Tests for Routes", function() {
  it("should go to the log in page if the user is not logged in", function() {
    expect(Router.current().route.getName()).toBe("login");
  });
});