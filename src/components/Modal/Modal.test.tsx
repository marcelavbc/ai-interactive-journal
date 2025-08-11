import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect, vi, describe } from 'vitest';
import '@testing-library/jest-dom';
import Modal from './Modal';

describe('Modal', () => {
  test('renders and closes via backdrop and Escape', async () => {
    const onClose = vi.fn();
    render(
      <Modal open title="Hello" onClose={onClose}>
        <p>Body</p>
      </Modal>
    );

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('dialog').parentElement!);
    expect(onClose).toHaveBeenCalledTimes(1);

    onClose.mockReset();
    cleanup();
    render(
      <Modal open title="Again" onClose={onClose}>
        Body
      </Modal>
    );
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  test('renders with title and body', () => {
    render(
      <Modal open title="Hello" onClose={() => {}}>
        <p>Body</p>
      </Modal>
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });
  test('renders with footer', () => {
    render(
      <Modal open title="Hello" onClose={() => {}} footer="Footer">
        <p>Body</p>
      </Modal>
    );
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  test('does not render when closed', () => {
    render(
      <Modal open={false} title="Hello" onClose={() => {}}>
        <p>Body</p>
      </Modal>
    );
    expect(screen.queryByText('Hello')).not.toBeInTheDocument();
    expect(screen.queryByText('Body')).not.toBeInTheDocument();
  });

  test('stops propagation when clicking modal content', async () => {
    const onClose = vi.fn();
    render(
      <Modal open title="Hello" onClose={onClose}>
        <p>Body</p>
      </Modal>
    );

    await userEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();
  });

  test('has proper accessibility attributes', () => {
    render(
      <Modal open title="Test Modal" onClose={() => {}}>
        <p>Body</p>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
    expect(screen.getByText('Test Modal')).toHaveAttribute('id', 'modal-title');
  });

  test('does not have aria-labelledby when no title', () => {
    render(
      <Modal open onClose={() => {}}>
        <p>Body</p>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).not.toHaveAttribute('aria-labelledby');
  });

  test('calls onClose when Escape key is pressed', async () => {
    const onClose = vi.fn();
    render(
      <Modal open title="Hello" onClose={onClose}>
        <p>Body</p>
      </Modal>
    );

    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when Escape key is pressed and modal is closed', async () => {
    const onClose = vi.fn();
    render(
      <Modal open={false} title="Hello" onClose={onClose}>
        <p>Body</p>
      </Modal>
    );

    await userEvent.keyboard('{Escape}');
    expect(onClose).not.toHaveBeenCalled();
  });
});
