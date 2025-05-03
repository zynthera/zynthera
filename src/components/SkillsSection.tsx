
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import anime from 'animejs';

interface Skill {
  id: number;
  title: string;
  description: string;
}

export function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        // For now, use mock data since Supabase isn't connected yet
        const mockSkills = [
          { 
            id: 1, 
            title: "Penetration Testing", 
            description: "Advanced system exploitation and vulnerability detection" 
          },
          { 
            id: 2, 
            title: "Bug Bounty", 
            description: "Critical vulnerability discovery in high-security systems" 
          },
          { 
            id: 3, 
            title: "Malware Engineering", 
            description: "Reverse engineering of complex threat actors" 
          },
          { 
            id: 4, 
            title: "AI Trading Bots", 
            description: "Autonomous market pattern recognition systems" 
          },
          { 
            id: 5, 
            title: "Threat Dev & Automation", 
            description: "Advanced defensive counterintelligence systems" 
          },
        ];
        
        setSkills(mockSkills);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching skills:", error);
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);
  
  function handleCardHover(e: React.MouseEvent<HTMLDivElement>) {
    anime({
      targets: e.currentTarget,
      scale: 1.03,
      duration: 300,
      easing: 'easeOutQuad'
    });
  }

  function handleCardLeave(e: React.MouseEvent<HTMLDivElement>) {
    anime({
      targets: e.currentTarget,
      scale: 1,
      duration: 300,
      easing: 'easeOutQuad'
    });
  }

  return (
    <section id="skills" className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-gothic mb-10 text-hacker-green">Skills</h2>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse bg-muted h-48 rounded-md"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.id}
                className="border border-hacker-green bg-gradient-to-b from-[rgba(0,255,0,0.05)] to-transparent p-5 rounded relative overflow-hidden opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={handleCardHover}
                onMouseLeave={handleCardLeave}
              >
                <div className="absolute top-0 right-0 w-14 h-14 border-l border-b border-hacker-green opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-14 h-14 border-r border-t border-hacker-green opacity-30"></div>
                
                <div className="mb-1 text-xs text-hacker-red opacity-70 font-mono uppercase tracking-wider">
                  {'// ' + (index + 1).toString().padStart(2, '0')}
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-hacker-green">
                  {skill.title}
                </h3>
                
                <p className="text-sm text-opacity-80 font-mono">
                  {skill.description}
                </p>
                
                <div className="mt-4 pt-3 border-t border-hacker-green border-opacity-30">
                  <div className="text-xs font-mono text-hacker-green opacity-50">
                    {`[STATUS: ACTIVE]`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
