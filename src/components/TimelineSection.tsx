
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { TerminalText } from './TerminalText';

interface TimelineEvent {
  id: number;
  year: number;
  description: string;
}

export function TimelineSection() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTimelineEvents() {
      try {
        // For now, use mock data since Supabase isn't connected yet
        const mockEvents = [
          { id: 1, year: 2023, description: "Trading started" },
          { id: 2, year: 2024, description: "Ethical hacking begins" },
          { id: 3, year: 2025, description: "Advanced mastery" },
          { id: 4, year: 2025, description: "Ultimate level achieved" }
        ];
        
        setEvents(mockEvents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching timeline events:", error);
        setError("Failed to load timeline data");
        setLoading(false);
      }
    }

    fetchTimelineEvents();
  }, []);

  if (error) {
    return (
      <section id="timeline" className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-gothic mb-8 text-hacker-green">Timeline</h2>
          <div className="text-hacker-red">
            <TerminalText text={`ERROR: ${error}`} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="timeline" className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-gothic mb-8 text-hacker-green">About</h2>
        
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-muted h-16 rounded-md"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-8 relative">
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-hacker-green opacity-30"></div>
            
            {events.map((event, index) => (
              <div 
                key={event.id} 
                className="relative pl-10 opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full border-2 border-hacker-green bg-hacker-black flex items-center justify-center">
                  <div className="w-2 h-2 bg-hacker-green rounded-full"></div>
                </div>
                
                <div className="bg-muted p-4 rounded-md hover:border-hacker-green border border-transparent transition-colors duration-300">
                  <h3 className="text-xl text-hacker-red font-mono font-bold">{event.year}</h3>
                  <TerminalText 
                    text={event.description} 
                    delay={index * 400} 
                    className="mt-2"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
