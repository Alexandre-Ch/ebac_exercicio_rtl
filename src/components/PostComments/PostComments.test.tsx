import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostComments from '.';

describe('Teste para o componente PostComments', () => {
    it('Deve renderizar o componente corretamente', () => {
        render(<PostComments />);
        expect(screen.getByText('Comentar')).toBeInTheDocument();
    });

    it('Deve adicionar dois comentários usando data-testid', async () => {
        render(<PostComments />);

        const textarea = screen.getByTestId('comment-input');
        const button = screen.getByRole('button', { name: /comentar/i });

        await userEvent.type(textarea, 'Primeiro comentário');
        await userEvent.click(button);

        await userEvent.type(textarea, 'Segundo comentário');
        await userEvent.click(button);

        const comments = screen.getAllByTestId('comment-item');

        expect(comments).toHaveLength(2);
        expect(comments[0]).toHaveTextContent('Primeiro comentário');
        expect(comments[1]).toHaveTextContent('Segundo comentário');
    });
});