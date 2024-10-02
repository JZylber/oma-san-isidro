export interface Filterable<S> {
  isFilteredBy: (element: S) => boolean;
  toString: () => string;
  generic?: S | undefined;
}

export class School implements Filterable<School> {
  public generic?: School | undefined;
  constructor(public name: string, public venue?: string) {
    this.generic = venue ? new School(name) : undefined;
  }

  isFilteredBy(element: School): boolean {
    return (
      this.name === element.name &&
      (element.venue ? this.venue === element.venue : true)
    );
  }

  toString(): string {
    return `${this.name}${this.venue ? `-${this.venue}` : ""}`;
  }
}

export class Participant implements Filterable<Participant> {
  constructor(public name: string, public surname: string) {}
  isFilteredBy(element: Participant): boolean {
    return this.name === element.name && this.surname === element.surname;
  }
  toString(): string {
    return `${this.surname}, ${this.name}`;
  }
}

export class Problem implements Filterable<Problem> {
  constructor(public value?: number, public minus: number = 0) {}
  isFilteredBy(element: Problem): boolean {
    return this.value
      ? this.value === element.value && this.minus === element.minus
      : true;
  }
  toString(): string {
    return `${this.value !== undefined ? this.value : ""}${"-".repeat(
      this.minus
    )}`;
  }
}

export class Problems implements Filterable<Problems> {
  constructor(public problems: Problem[], public total: number) {}
  isFilteredBy(element: Problems): boolean {
    return (
      this.total === element.total &&
      this.problems.every((problem, index) =>
        problem.isFilteredBy(element.problems[index])
      )
    );
  }
  toString(): string {
    return `${this.problems.map((problem) => problem.toString()).join(", ")},${
      this.total
    }`;
  }
}

export type Filterables = string | number | boolean | Filterable<any>;

export type ObjectWithFilterables = {
  filterable: Record<string, Filterables>;
  payload: any;
};

export type FilterObject = Record<string, Filterables>;

export type FilterableObject = FilterObject | ObjectWithFilterables;
