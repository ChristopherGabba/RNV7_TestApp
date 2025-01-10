import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'testStorageForCompressorBug',
  access: (allow) => ({
    'public/*': [
      allow.guest.to(['read', "delete", "write"]),
      allow.authenticated.to(['read', 'write', 'delete']),
    ],
  })
});