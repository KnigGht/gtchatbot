import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Copy, Check } from 'lucide-react';
import companyLogo from './assets/gt-logo.png';
import companyLogo2 from './assets/loader.png';

export default function AIChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Auto-focus input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  // API call to Alibaba Cloud
  const getAIResponse = async (userMessage) => {
    try {
      const response = await fetch('https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_ALIBABA_API_KEY}`
        },
        body: JSON.stringify({
          model: 'qwen-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a helpful assistant for MM2H (Malaysia My Second Home) visa program. Answer questions based ONLY on the following FAQ information. Be conversational, friendly, and concise.

=== FREQUENTLY ASKED QUESTIONS - MM2H APPLICATION ===

GENERAL:

Q: If you have a Malaysian wife/husband, can you still apply for the MM2H program?
A: The rules were changed several years ago and you may now apply if you have a Malaysian wife/husband but subject to approval.

Q: I used to be a Malaysian citizen can I still apply with my foreign passport?
A: You may try but subject to approval.

Q: Do I have to move to Malaysia as soon as I get approval?
A: The government usually allows six months to collect the visa. You do not have to move to Malaysia immediately after the visa is endorsed in your passport, but those under 50 years of age are required to spend 90 days a year in the country. All approved applicants must purchase a property within one year of receiving approval.

Q: I am not married but my partner and I have been living together for a long time. Can we apply for the program?
A: If you are not married, you will have to apply separately and you will both need to qualify for the programme.

Q: Will I get PR (Permanent Residency) status if I apply for MM2H?
A: Unfortunately, having an MM2H visa does not entitle applicants to Permanent Residency and it cannot be converted to PR status.

Q: How much money do I need to live in Malaysia?
A: It is possible to live in Malaysia on a very low monthly income but to enjoy a reasonably comfortable lifestyle a couple would need around RM10,000 (US$2400) a month. However, this is subject to each individual's lifestyle.

APPLICATION:

Q: Do I have to show my income or liquid assets to apply for the visa?
A: There is currently no requirement to show proof of income or liquid assets. This condition was removed. However, you will need enough funds to place the fixed deposit and a down payment to purchase a property. You should also consider the funds required for living expenses.

Q: Do I have to be in Malaysia when I apply for visa?
A: That is not necessary as long as all required documents are submitted. Upon approval, applicants must come to Malaysia to have their passports endorsed (after a medical test by a doctor in Malaysia, placing the required fixed deposit, and arranging medical insurance).

Q: How long does it take to approve the visa after the documents are submitted?
A: The government has indicated a maximum of three months (13 weeks) but with a limited number of cases being approved under the new terms and conditions, we cannot confirm the average number of weeks. It may take more than 3 to 6 months.

FIXED DEPOSIT:

Q: Are Fixed Deposits required for each adult and child that apply the MM2H visa?
A: The fixed deposit placement only has to be made by the main applicant. Dependents are not required to place.

Q: Is it allowable, once you have been conditionally approved, to enter the country and go to a local bank to deposit cash and open an account?
A: Most banks will want to see the conditional letter of approval to open the bank account. Setting up the FD account is simple but transferring the money from your home country to the bank account here can take several days. There are restrictions on how much foreign currency cash you can bring into the country (currently US$10,000 equivalent).

Q: Is the interest on the fixed deposit taxable?
A: There is no tax on the interest from the Fixed Deposits.

Q: How much interest will I earn on the fixed deposit, and can I keep this money?
A: You may keep the interest on the Fixed Deposit. Interest paid to foreigners varies from bank to bank, but is currently around 3.0 percent.

Q: Should the fixed deposit be in US dollars or Malaysian Ringgit?
A: It can be in either currency. The ringgit amount would be at the bank's daily conversion rate.

Q: When can a withdrawal of 50% of the Fixed Deposit be made?
A: Partial withdrawal can be made at any time after the visa is endorsed in the passport. It can only be withdrawn for approved purposes -- currently property purchase, education or medical expenses in Malaysia or domestic travel (air ticket hotel costs).

PROPERTY PURCHASE:

Q: Can existing property ownership in Malaysia qualify for the property ownership condition?
A: Yes, it will be accepted but it will not qualify for withdrawal of 50% of the fixed deposit. In order to do this the sale and purchase agreement must be dated after the visa is endorsed.

Q: How soon do I have to buy property after my visa is endorsed?
A: Approved applicants have one year to buy a property. MM2H agents are expected to check this is done. Non-compliance may result in the visa being revoked.

Q: What types of property can be purchased?
A: It has to be a residential property. This includes SOHO apartments ('Small office, home office' designed for people who work from home) and service apartments. At this stage, it does not include senior living communities which usually require long-term tenancy agreements or membership fees.

Q: Can the property be owned by people other than the visa holders?
A: It can be shared ownership with anyone who was listed on the conditional approval letter.

SPECIAL FINANCE ZONE:

Q: Is it true that the Special Finance Zone is only valid in the Forest City development in Johor?
A: At this time Forest City is the only place that qualifies although it is expected that in due course (no timeline given) it will be expanded to other areas in Johor.

MINIMUM STAY IN MALAYSIA:

Q: Are all approved applicants required to spend 90 days a year in Malaysia?
A: The minimum stay requirement is only for those aged under 50. It does not apply to those over 50 or who reach the age of 50 after joining the programme.

Q: How is the minimum stay calculated?
A: It is required that the visa holder spend at least 90 days every year in Malaysia. The first year is on pro rata basis. Visa holders cannot average their days in Malaysia over the full period of the visa as they must meet this condition every year.

WORKING IN MALAYSIA:

Q: Can a visa holder work full time or part time?
A: Only the Platinum MM2H visa allows people to work in Malaysia. The other visas do not permit it so while it is possible to invest and be a shareholder in a local company, working in any capacity is not permitted even holding the position of director. If you wish to work it would require converting your visa to an employment pass.

CHANGING PRINCIPAL:

Q: Designating another principal visa holder if the original dies.
A: The new rules allow the principal to designate a dependent as successor upon their death but the mechanics of this have not yet been finalized. The government recommends preparing a will in Malaysia to facilitate transfer of any locally held assets.

=== END OF FAQ ===

Instructions:
- Answer questions based on the FAQ above
- Be friendly and conversational
- If a question is not covered in the FAQ, politely say "I don't have that specific information in my current knowledge base, but I recommend contacting Growth Tip Consultancy directly for more details."
- Keep answers concise but complete
- Use natural language, not robotic responses`
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 800
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        return data.choices[0].message.content;
      } else {
        return "Sorry, I couldn't process your request. Please try again.";
      }
    } catch (error) {
      console.error('API Error:', error);
      return "Sorry, there was an error connecting to the AI service. Please check your API key and try again.";
    }
  };

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    if (inputRef.current) {
      inputRef.current.focus();
    }

    try {
      const aiResponse = await getAIResponse(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, there was an error processing your request.' 
      }]);
    } finally {
      setIsLoading(false);

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  
  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <img src={companyLogo} alt="Growth Tip Logo" style={styles.headerLogo} />
        </div>
      </header>

      {/* Messages Container */}
      <div style={styles.messagesContainer}>
        {messages.length === 0 ? (
          // Welcome screen - centered
          <div style={styles.welcomeScreen}>
            <img src={companyLogo2} alt="Growth Tip" style={styles.welcomeLogo} />
            <h2 style={styles.welcomeTitle}>How can I help you today?</h2>
            <p style={styles.welcomeSubtitle}>
              I'm Growth Tip's virtual advisor, your guide to our services.
            </p>
          </div>
        ) : (
          // Chat messages
          <div style={styles.chatContent}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  ...styles.messageRow,
                  justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                {message.role === 'assistant' && (
                  <div style={styles.botAvatar}>
                    <Bot className="w-5 h-5" style={styles.botAvatarImage} />                  
                  </div>
                )}
                <div style={{ position: 'relative', maxWidth: '600px' }}>
                  <div style={message.role === 'user' ? styles.userMessage : styles.botMessage}>
                    <p style={styles.messageText}>{message.content}</p>
                  </div>
                  {message.role === 'assistant' && message.content.length > 50 && (
                    <button
                      onClick={() => copyToClipboard(message.content, index)}
                      style={{
                        ...styles.copyButton,
                        backgroundColor: copiedIndex === index ? '#10B981' : 'transparent'
                      }}
                      title={copiedIndex === index ? 'Copied!' : 'Copy message'}
                    >
                      {copiedIndex === index ? (
                        <Check size={14} color="#FFFFFF" />
                      ) : (
                        <Copy size={14} color="#666666" />
                      )}
                    </button>
                  )}
                </div>
                {message.role === 'user' && (
                  <div style={styles.userAvatar}>
                    <User size={20} color="#FFFFFF" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div style={styles.messageRow}>
                <div style={styles.botAvatar}>
                  <Bot className="w-5 h-5" style={styles.botAvatarImage} />
                </div>
                <div style={styles.botMessage}>
                  <div style={styles.loadingDots}>
                    <div style={{...styles.dot, animationDelay: '0ms'}}></div>
                    <div style={{...styles.dot, animationDelay: '150ms'}}></div>
                    <div style={{...styles.dot, animationDelay: '300ms'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div style={messages.length === 0 ? styles.inputAreaCentered : styles.inputAreaBottom}>
        <div style={styles.inputContainer}>
          <div style={styles.inputWrapper}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here...(English or 中文)"
              style={styles.textarea}
              rows="1"
              disabled={isLoading}
            />
            <button
              onClick={handleSubmit}
              disabled={!input.trim() || isLoading}
              style={{
                ...styles.sendButton,
                opacity: (!input.trim() || isLoading) ? 0.5 : 1,
                cursor: (!input.trim() || isLoading) ? 'not-allowed' : 'pointer'
              }}
            >
              <Send size={20} />
            </button>
          </div>
          <p style={styles.inputHint}>
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}

// ==================== STYLES ====================

const styles = {
  // Main container
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#F5F5F5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  // Header
  header: {
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #E5E5E5',
    padding: '12px 16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  headerContent: {
    maxWidth: '1024px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  headerLogo: {
    height: '40px',
    width: 'auto',
  },
  headerTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#333333',
    margin: 0,
  },

  // Messages container
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    position: 'relative',
  },

  // Welcome screen
  welcomeScreen: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
  },
  welcomeLogo: {
    height: '80px',
    width: 'auto',
    marginBottom: '24px',
  },
  welcomeTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#333333',
    marginBottom: '8px',
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: '16px',
    color: '#666666',
    textAlign: 'center',
    maxWidth: '500px',
    margin: 0,
  },

  // Chat content
  chatContent: {
    maxWidth: '1024px',
    margin: '0 auto',
    padding: '24px 16px',
  },

  // Message row
  messageRow: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
  },

  // Bot avatar
  botAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    color: '#D84848',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    padding: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  botAvatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },

  // User avatar
  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#555555',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  // Message bubbles
  userMessage: {
    maxWidth: '600px',
    padding: '12px 16px',
    borderRadius: '18px',
    backgroundColor: '#D84848',
    color: '#FFFFFF',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
  },
  botMessage: {
    maxWidth: '600px',
    padding: '12px 40px 12px 16px',
    borderRadius: '18px',
    backgroundColor: '#FFFFFF',
    color: '#333333',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #E5E5E5',
  },
  messageText: {
    margin: 0,
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    fontSize: '15px',
    lineHeight: '1.5',
  },

  // Loading dots
  loadingDots: {
    display: 'flex',
    gap: '4px',
  },
  dot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#999999',
    borderRadius: '50%',
    animation: 'bounce 1.4s infinite ease-in-out',
  },

  // Input area
  inputAreaCentered: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: '1px solid #E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  inputAreaBottom: {
    borderTop: '1px solid #E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
    maxWidth: '1024px',
    margin: '0 auto',
    padding: '16px',
  },
  inputWrapper: {
    position: 'relative',
  },

  // Textarea
  textarea: {
    width: '100%',
    padding: '12px 48px 12px 16px',
    border: '1px solid #CCCCCC',
    borderRadius: '24px',
    fontSize: '15px',
    resize: 'none',
    minHeight: '52px',
    maxHeight: '200px',
    backgroundColor: '#FFFFFF',
    color: '#333333',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },

  // Send button
  sendButton: {
    position: 'absolute',
    right: '8px',
    bottom: '14px',
    width: '36px',
    height: '36px',
    borderRadius: '18px',
    backgroundColor: '#D84848',
    color: '#FFFFFF',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },

  // Input hint
  inputHint: {
    fontSize: '12px',
    color: '#999999',
    textAlign: 'center',
    marginTop: '10px',
    margin: '8px 0 10px 0',
  },

  // Copy button
  copyButton: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    border: '1px solid #E5E5E5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    backgroundColor: 'transparent',
  },
};