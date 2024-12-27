import {
  ArgsType,
  Field,
  Float,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

export type RestrictProperties<T, U> = Required<U> & {
  [K in keyof T]: K extends keyof U ? T[K] : never;
};

// implements Prisma.DateTimeFilter
@InputType()
export class DateTimeFilter {
  equals?: string;
  gt?: string;
  gte?: string;
  in?: string[];
  lt?: string;
  lte?: string;
  notIn?: string[];
}

registerEnumType(Prisma.QueryMode, {
  name: 'QueryMode',
});

// implements Required<Prisma.StringFilter>
@InputType()
export class StringFilter {
  contains?: string;
  endsWith?: string;
  equals?: string;
  gt?: string;
  gte?: string;
  in?: string[];
  lt?: string;
  lte?: string;
  @Field(() => Prisma.QueryMode)
  mode?: Prisma.QueryMode;
  not?: string;
  notIn?: string[];
  startsWith?: string;
}
@InputType()
export class StringListFilter {
  equals?: string[];
  has?: string;
  hasEvery?: string[];
  hasSome?: string[];
  isEmpty?: boolean;
}

@InputType()
export class BoolFilter {
  equals?: boolean;
  not?: boolean;
}

// implements Required<Prisma.IntFilter>
@InputType()
export class IntFilter {
  equals?: number;
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
}

@InputType()
export class FloatFilter {
  equals?: number;
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
  not?: number;
}

registerEnumType(Prisma.SortOrder, {
  name: 'SortOrder',
});

@ObjectType()
export class AggregateCountOutput {
  count: number;
}

@InputType()
export class LocationFilterInput {
  @Field(() => Float)
  ne_lat: number;

  @Field(() => Float)
  ne_lng: number;

  @Field(() => Float)
  sw_lat: number;

  @Field(() => Float)
  sw_lng: number;
}

@ArgsType()
export class PaginationInput {
  skip?: number;
  take?: number;
}
