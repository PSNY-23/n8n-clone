import { inngest } from './client';
import { generateText } from 'ai';

//Import ai-sdk for diff providers
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';

//Client instance for each provider
const google = createGoogleGenerativeAI();
const openai = createOpenAI();
const anthropic = createAnthropic();

export const executeAI = inngest.createFunction(
  { id: 'execute-ai' },
  { event: 'execute/ai' },
  async ({ event, step }) => {
    await step.sleep('wait-for', '20s');

    const { steps: geminiSteps } = await step.ai.wrap('gemini-generate-text', generateText, {
      model: google('gemini-2.5-flash'),
      system: 'You are a helpful assistant',
      prompt: 'What is 2+2 ?',
    });

    const { steps: openaiSteps } = await step.ai.wrap('openai-generate-text', generateText, {
      model: openai('gpt-3.5-turbo-1106'),
      system: 'You are a helpful assistant',
      prompt: 'What is 2+2 ?',
    });

    const { steps: anthropicSteps } = await step.ai.wrap('anthropic-generate-text', generateText, {
      model: anthropic('claude-haiku-4-5'),
      system: 'You are a helpful assistant',
      prompt: 'What is 2+2 ?',
    });

    return {
      geminiSteps,
      openaiSteps,
      anthropicSteps,
    };
  }
);
