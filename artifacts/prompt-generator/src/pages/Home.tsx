import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Copy, Check, Loader2, Wand2, Sparkles, AlertCircle } from "lucide-react";

import { useGeneratePrompt } from "@workspace/api-client-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  idea: z.string().min(1, "Please provide an idea or task to get started."),
  useCase: z.string().optional(),
  tone: z.string().optional(),
  format: z.string().optional(),
  model: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Home() {
  const [isCopied, setIsCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idea: "",
      useCase: "",
      tone: "",
      format: "",
      model: "",
    },
  });

  const { mutate: generatePrompt, data, isPending, isError, error } = useGeneratePrompt();

  function onSubmit(values: FormValues) {
    generatePrompt({ data: values });
  }

  async function handleCopy() {
    if (data?.prompt) {
      await navigator.clipboard.writeText(data.prompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 md:p-8 lg:p-12">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Input Form */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Prompt Forge</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Sharpen your intent.
            </h1>
            <p className="text-muted-foreground text-lg">
              Craft precise, model-ready instructions from a rough idea in seconds.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="idea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Your idea or task</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="E.g., Write a blog post about the benefits of functional programming..."
                        className="min-h-[140px] resize-none text-base p-4 bg-card shadow-sm border-border focus-visible:ring-primary focus-visible:border-primary"
                        data-testid="textarea-idea"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="useCase"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Use Case</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-use-case" className="bg-card">
                            <SelectValue placeholder="Select one" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Writing">Writing</SelectItem>
                          <SelectItem value="Coding">Coding</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Research">Research</SelectItem>
                          <SelectItem value="Image generation">Image generation</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Tone</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-tone" className="bg-card">
                            <SelectValue placeholder="Select one" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Professional">Professional</SelectItem>
                          <SelectItem value="Casual">Casual</SelectItem>
                          <SelectItem value="Persuasive">Persuasive</SelectItem>
                          <SelectItem value="Technical">Technical</SelectItem>
                          <SelectItem value="Friendly">Friendly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="format"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Output Format</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-format" className="bg-card">
                            <SelectValue placeholder="Select one" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Paragraph">Paragraph</SelectItem>
                          <SelectItem value="Bullet points">Bullet points</SelectItem>
                          <SelectItem value="Step-by-step">Step-by-step</SelectItem>
                          <SelectItem value="JSON">JSON</SelectItem>
                          <SelectItem value="Table">Table</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>

              <div className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 shadow-sm">
                <div className="flex flex-col">
                  <Label htmlFor="advanced-toggle" className="text-sm font-medium cursor-pointer">
                    Advanced options
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    Choose a specific target model
                  </span>
                </div>
                <Switch
                  id="advanced-toggle"
                  checked={showAdvanced}
                  onCheckedChange={(checked) => {
                    setShowAdvanced(checked);
                    if (!checked) {
                      form.setValue("model", "");
                    }
                  }}
                  aria-expanded={showAdvanced}
                  aria-controls="advanced-model-options"
                  data-testid="switch-advanced"
                />
              </div>

              {showAdvanced && (
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem id="advanced-model-options">
                      <FormLabel className="text-sm font-medium">Target Model</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-model" className="bg-card">
                            <SelectValue placeholder="Default: Claude Sonnet 4.6" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="anthropic/claude-sonnet-4.6">Claude Sonnet 4.6</SelectItem>
                          <SelectItem value="openai/gpt-4o">GPT-4o</SelectItem>
                          <SelectItem value="openai/gpt-4o-mini">GPT-4o mini</SelectItem>
                          <SelectItem value="google/gemini-2.5-flash">Gemini 2.5 Flash</SelectItem>
                          <SelectItem value="google/gemini-2.5-pro">Gemini 2.5 Pro</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <Button 
                type="submit" 
                size="lg" 
                className="w-full text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                disabled={isPending}
                data-testid="button-generate"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Forging prompt...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    Generate Prompt
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Right Column: Output Area */}
        <div className="lg:col-span-7 h-full flex flex-col">
          <Card className="flex-1 min-h-[400px] lg:min-h-[600px] flex flex-col relative overflow-hidden bg-card border-border shadow-md" data-testid="card-output">
            
            {/* Top Toolbar */}
            <div className="h-14 border-b border-border bg-muted/30 flex items-center justify-between px-4">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Output
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                disabled={!data?.prompt || isPending}
                className="text-muted-foreground hover:text-foreground"
                data-testid="button-copy"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 mr-1.5 text-green-500" />
                    <span className="text-green-500 font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1.5" />
                    Copy
                  </>
                )}
              </Button>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 overflow-y-auto relative">
              {isPending ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-card/50 backdrop-blur-sm z-10" data-testid="status-loading">
                  <Loader2 className="w-8 h-8 animate-spin mb-4 text-primary" />
                  <p className="text-sm font-medium animate-pulse">Structuring your prompt...</p>
                </div>
              ) : isError ? (
                <Alert variant="destructive" className="mt-4" data-testid="status-error">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Generation failed</AlertTitle>
                  <AlertDescription>
                    {(error?.data as { error?: string } | null)?.error || error?.message || "An unexpected error occurred while generating the prompt. Please try again."}
                  </AlertDescription>
                </Alert>
              ) : data?.prompt ? (
                <div 
                  className="font-mono text-sm leading-relaxed whitespace-pre-wrap text-card-foreground selection:bg-primary/20"
                  data-testid="text-prompt-result"
                >
                  {data.prompt}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto opacity-50" data-testid="status-empty">
                  <Wand2 className="w-12 h-12 mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Ready when you are</h3>
                  <p className="text-sm text-muted-foreground">
                    Fill out the details on the left and click generate. Your polished prompt will appear right here.
                  </p>
                </div>
              )}
            </div>
            
          </Card>
        </div>

      </div>
    </div>
  );
}