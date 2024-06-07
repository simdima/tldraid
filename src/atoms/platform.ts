import { atom } from 'jotai';
import { z } from 'zod';

export const PlatformSchema = z.enum(['android', 'common', 'linux', 'osx', 'windows']);
export type Platform = z.infer<typeof PlatformSchema>;

export const platformAtom = atom<Platform>('common');
