import React from "react";
import { act } from "react-dom/test-utils";
import { container } from "webpack";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import {
  getIdentifiers,
  Errors,
  firstDoseVaccinated,
  secondDoseVaccinated,
} from "./immunizationListPresenter";

describe("identifiers", () => {
  test("renders ok the nin", async () => {
    render(getIdentifiers({ NIN: "ASA" }));
    expect(container).toBeTruthy();
    expect(screen.getByTestId("identifier")).toHaveTextContent("NIN: ASA");
  });
  test("renders ok the mychilld id", async () => {
    render(getIdentifiers({ myChildId: "ASA" }));
    expect(container).toBeTruthy();
    expect(screen.getByTestId("identifier")).toHaveTextContent("ASA");
  });
});

describe("errors", () => {
  test("render error on no firstDoseDate", () => {
    render(<Errors patient={{ vaccinacion: [] }}></Errors>);
    expect(screen.getByTestId("errors")).toHaveTextContent(
      "Vaccination date is missing"
    );
  });

  test("render no error on no firstDoseDate when firsDtoseDate", () => {
    render(
      <Errors patient={{ vaccination: [{ firstDoseDate: "some" }] }}></Errors>
    );
    expect(screen.getByTestId("errors")).not.toHaveTextContent(
      "Vaccination date is missing"
    );
  });
  test("render no error on no firstDoseDate when date", () => {
    render(<Errors patient={{ vaccination: [{ date: "some" }] }}></Errors>);
    expect(screen.getByTestId("errors")).not.toHaveTextContent(
      "Vaccination date is missing"
    );
  });
  test("render error on missing vaccine name", () => {
    render(<Errors patient={{ vaccination: [{}] }}></Errors>);
    expect(screen.getByTestId("errors")).toHaveTextContent(
      "Name of the vaccine is missing"
    );
  });
  test("not render error on missing vaccine name when present", () => {
    render(
      <Errors
        patient={{ vaccination: [{ nameOfTheVaccine: "Astrazeneca" }] }}
      ></Errors>
    );
    expect(screen.getByTestId("errors")).not.toHaveTextContent(
      "Name of the vaccine is missing"
    );
  });
});

describe("checks for vaccination", () => {
  test("first dose vaccinated", () => {
    expect(
      firstDoseVaccinated({ vaccination: [{ firstDoseDate: "some" }] })
    ).toBeTruthy();
    expect(
      firstDoseVaccinated({ vaccination: [{ nameOfTheVaccine: "some" }] })
    ).toBeTruthy();
    expect(firstDoseVaccinated({ vaccination: [{}] })).toBeFalsy();
  });
  test("second dose vaccinated", () => {
    expect(
      secondDoseVaccinated({ vaccination: [{}, { firstDoseDate: "some" }] })
    ).toBeTruthy();
    expect(
      secondDoseVaccinated({ vaccination: [{}, { nameOfTheVaccine: "some" }] })
    ).toBeTruthy();
    expect(secondDoseVaccinated({ vaccination: [{}] })).toBeFalsy();
    expect(secondDoseVaccinated({ vaccination: [{}, {}] })).toBeFalsy();
  });
});
