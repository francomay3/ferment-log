import React from 'react';

import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <Box>
      <Box className="items-center mx-4">
        <Text className="text-center text-typography-950">
          Open up the code for this screen:
        </Text>
        <Box className="rounded-sm p-2 my-2 bg-secondary-200">
          <Text className="text-sm leading-5 text-center font-FunnelSans">
            {path}
          </Text>
        </Box>

        <Text className="text-center text-typography-950">
          Change any of the text, save the file, and your app will automatically
          update.
        </Text>
      </Box>
    </Box>
  );
}