import { describe, expect, it } from 'vitest';
import { resolveOathTrait } from '../data/oath';

describe('resolveOathTrait', () => {
  it('matches known keywords', () => {
    const trait = resolveOathTrait('Ta sẽ bảo hộ kẻ yếu');
    expect(trait.title).toBe('Tâm Khiên');
  });

  it('falls back to default when not found', () => {
    const trait = resolveOathTrait('Ta chỉ là cơn gió');
    expect(trait.title).toBe('Phàm Tâm');
  });
});
