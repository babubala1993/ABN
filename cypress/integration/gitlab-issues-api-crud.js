describe('Test Gitlab issues API CRUD operations', function () {
//This code can be refactored in multiple ways, since it is an open assignment and considering the time constraints 
//I only did the essential what is minimum required for automating the API, hence not followed any framework

    it('verify gitlab issue has been created', () => {
        //test values are given in 'testdata.json' using cypress fixture we don't need to hard code the values inside code
        cy.fixture('testdata.json').then((data) => {
            //calling the POST request to make create operation
            cy.request({
                method: 'POST',
                url: data.baseUrl + "/issues",
                headers: {
                    'PRIVATE-TOKEN': data.privateToken,
                },
                body: {
                    "title": "test issue"
                }
            }).then((response) => {
                //validating the response status code for POST operation
                expect(response.status).to.eq(201)
                //created issueID has been stored in the fixture file for using it in the below request
                cy.readFile(data.filePath).then((example) => {
                    example.issueID = response.body.iid;
                    cy.writeFile(data.filePath, example)
                })
            })
        })
    })

    it('verify the created gitlab issue', () => {
        cy.fixture('testdata.json').then((data) => {
            //calling the GET request to list and verify the issue created from the POST request above
            cy.request({
                method: 'GET',
                url: data.baseUrl + `/issues/` + data.issueID,
                headers: {
                    'PRIVATE-TOKEN': data.privateToken,
                }
            }).then((response) => {
                //validating the response status code for GET operation
                expect(response.status).to.eq(200)
            })
        })
    })

    it('update and verify the created gitlab issue', () => {
         cy.fixture('testdata.json').then((data) => {
            //calling the PUT request to update the issue created from the POST request above by using the stored issueID
            cy.request({
                method: 'PUT',
                url: data.baseUrl + `/issues/` + data.issueID,
                headers: {
                    'PRIVATE-TOKEN': data.privateToken,
                },
                body: {
                    "title": "test issue updated"
                }
            }).then((response) => {
                //validating the response status code for PUT operation
                expect(response.status).to.eq(200)
                expect(response.body.title).to.eq("test issue updated")
            })
        })
    })

    it('delete the created gitlab issue', () => {
        cy.fixture('testdata.json').then((data) => {
            //calling the DELETE request to delete the issue created from the POST request using the stored issueID
            cy.request({
                method: 'DELETE',
                url: data.baseUrl + `/issues/` + data.issueID,
                headers: {
                    'PRIVATE-TOKEN': data.privateToken,
                }
            }).then((response) => {
                //validating the response status code for DELETE operation
                expect(response.status).to.eq(204)
            })
        })
    })

})