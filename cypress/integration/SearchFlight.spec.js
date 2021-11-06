function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


describe("Assignment First Scenario", () => {




        it("Test POST Request", () => {


                const origins = ["DXB", "AUH","SHJ","JED","RUH"];
                const destinations = ["AMM","CAI","DEL","KHI","PAR"];

                let depDate = new Date();
                depDate.setDate(depDate.getDate() + getRandomInt(2,15));
                let dep = depDate.toISOString().split('T')[0];

                let retDate = new Date();
                retDate.setDate(retDate.getDate() + getRandomInt(16,25));
                let ret = retDate.toISOString().split('T')[0];
                
                cy.visit('https://www.tajawal.com/');
                cy.visit('https://www.tajawal.com/en');
                cy.url().should('contains', 'https://www.tajawal.com/en');

                cy.visit('https://www.tajawal.com/en/flights-home');

                cy.get('[data-testid=FlightSearchBox__FromAirportInput]').click();
                cy.get('[data-testid=FlightSearchBox__FromAirportInput]').type('DXB');
                cy.wait(500);
                cy.get('[data-testid=FlightSearchBox__FromAirportInput]').type('{enter}');


                cy.get('[data-testid=FlightSearchBox__ToAirportInput]').click();
                cy.get('[data-testid=FlightSearchBox__ToAirportInput]').type('CAI');
                cy.wait(500);
                cy.get('[data-testid=FlightSearchBox__ToAirportInput]').type('{enter}');

                cy.get('[data-testid=FlightSearchBox__FromDateButton]').click();
                cy.wait(200);

                cy.get(`span[data-testid=FlightSearchCalendar__${dep}]`).click();
                cy.wait(200);
                cy.get(`span[data-testid=FlightSearchCalendar__${ret}]`).click();
                cy.wait(200);

                cy.get('[data-testid=FlightSearchBox__SearchButton]').first().click();

                cy.get('[data-testid=FlightSearchResults__ProgressBar__finished]', { timeout: 20000 }).should('be.hidden');
                cy.wait(200);
                cy.get('[data-testid=Cheapest__SortBy]').click();
                cy.wait(200);
                let element1;
                cy.get('[data-testid=Cheapest__SortBy__selected] > div > span').last().then(($span) => {
                    cy.log($span.text())
                    //const val = $span.text();
                    cy.get('[data-testid=Group0__PriceLabel]').should(($res) => {
                        expect($span.text()).contains($res.text())
                    })
                })
            })
})
