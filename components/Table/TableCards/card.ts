interface CardProps<S extends object>{
    value: S
}

export interface CardType<S extends object> {
    (props: CardProps<S>): JSX.Element
}