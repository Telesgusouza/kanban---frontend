import * as Styled from './styled';

interface IProps {
    width: string;
    heigth: string;
}

export default function BoxLoading({ width, heigth }: IProps) {

    return (
        <>
            <Styled.Loading heigth={heigth} width={width} />
        </>
    )
}
