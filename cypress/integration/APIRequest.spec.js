

describe("Assignment First Scenario", () => {




  it("Test POST Request", () => {
        let date = new Date();
        date.setDate(date.getDate() + 8);
        let checkIn = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
      
        let date2 = new Date();
        date2.setDate(date2.getDate() + 12);
        let checkOut = date2.getDate()+'-'+(date2.getMonth()+1)+'-'+date2.getFullYear();
        
        cy.log(checkIn);
        cy.log(checkOut);
        cy.fixture("guestData").then(guestBody => {
        cy.request({
             method: 'POST',
             url: 'https://www.tajawal.ae/api/hotel/ahs/search/request',
             headers: {
              'Content-Type': 'application/json'
            },
             body: {
              "dates": {
                "checkin": checkIn.toString(),
                "checkout": checkOut.toString()
              },
              "destination": "paris",
              "room": guestBody,
              "placeId": "ChIJD7fiBh9u5kcRYJSMaMOCCwQ"
            }
        }).then((response) => { 
            cy.log(response.body);
            expect(response.body).has.property("title","Automation"); 
        })
      }
  )

  

})})
