/**
 * ! Executing this script will delete all data in your database and seed it with 10 user.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from '@snaplet/seed';
import { copycat } from '@snaplet/copycat';

const main = async () => {
  const seed = await createSeedClient();

  // Truncate all tables in the database
  await seed.$resetDatabase();

  // Seed the database with 10 user
  await seed.user((x) =>
    x(10, () => ({
      id: ({ seed }) => copycat.uuid(seed),
      username: ({ seed }) => copycat.username(seed),
      email: ({ seed }) => copycat.email(seed),
      password: ({ seed }) => copycat.password(seed),
      token: null,
      isVerified: ({ seed }) => copycat.bool(seed),
      imgProfile: null,
      createdAt: ({ seed }) => copycat.dateString(seed),
      updatedAt: ({ seed }) => copycat.dateString(seed),
      deletedAt: ({ seed }) =>
        copycat.oneOf(seed, [null, copycat.dateString(seed)]),
    })),
  );

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log('Database seeded successfully!');

  process.exit();
};

main();
