import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Send, CheckCircle, Pyramid } from 'lucide-react';
import { Product } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface QuickPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}

const QuickPurchaseModal: React.FC<QuickPurchaseModalProps> = ({ isOpen, onClose, product }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      message: '',
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const formData = {
        ...data,
        productName: product?.name,
        productPrice: product?.price,
        productId: product?.id,
      };
      
      if (!/^\S+@\S+\.\S+$/.test(data.email)) {
        toast({ title: "Invalid email", description: "Please enter a valid email address", variant: "destructive" });
        setIsSubmitting(false);
        return;
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      toast({ title: "Purchase request sent!", description: "We'll contact you soon to confirm your order." });
      
      setTimeout(() => {
        setIsSubmitted(false);
        form.reset();
        onClose();
      }, 3000);
    } catch (error) {
      toast({ title: "Failed to send request", description: "Please try again later", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto" style={{ 
        backgroundColor: '#EBEBD3',
      }}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#121769] via-[#67246A] to-[#FE49AF]"></div>
        
        <DialogHeader className="relative pb-2">
          <div className="flex items-center justify-center gap-2">
            <Pyramid className="h-5 w-5 text-[#67246A]" />
            <DialogTitle className="text-xl text-[#121769]">Quick Purchase</DialogTitle>
          </div>
          {/* <button onClick={onClose} className="absolute right-0 top-0">
            <X className="h-4 w-4 text-[#67246A]" />
          </button> */}
        </DialogHeader>
        
        {isSubmitted ? (
          <div className="py-4 flex flex-col items-center text-center">
            <CheckCircle className="h-12 w-12 text-[#67246A] mb-2" />
            <h3 className="text-lg font-medium text-[#121769]">Request Sent!</h3>
            <p className="text-sm text-[#67246A]">We'll contact you shortly.</p>
          </div>
        ) : (
          <>
            {product && (
              <div className="flex items-center gap-3 mb-4 p-2 text-sm" style={{
                backgroundColor: '#12176910',
                borderLeft: '3px solid #67246A'
              }}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-12 h-12 object-cover rounded-md border border-[#12176920]"
                />
                <div>
                  <h3 className="font-medium text-[#121769] line-clamp-1">{product.name}</h3>
                  <p className="text-[#67246A]">${product.price.toFixed(2)}</p>
                </div>
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-[#121769]">Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Full name" 
                            required {...field} 
                            className="h-8 text-xs border-[#67246A50]"
                            style={{ backgroundColor: '#EBEBD3' }}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-[#121769]">Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="Email address" 
                            required {...field} 
                            className="h-8 text-xs border-[#67246A50]"
                            style={{ backgroundColor: '#EBEBD3' }}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-[#121769]">Phone</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Phone number" 
                            {...field} 
                            className="h-8 text-xs border-[#67246A50]"
                            style={{ backgroundColor: '#EBEBD3' }}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-[#121769]">Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Delivery address" 
                            required {...field} 
                            className="h-8 text-xs border-[#67246A50]"
                            style={{ backgroundColor: '#EBEBD3' }}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-[#121769]">Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Special instructions" 
                          {...field} 
                          className="min-h-[60px] text-xs border-[#67246A50]"
                          style={{ backgroundColor: '#EBEBD3' }}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full h-8 text-xs" 
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: isSubmitting ? '#67246A' : '#121769',
                    backgroundImage: isSubmitting ? 'none' : 'linear-gradient(to right, #121769, #67246A)',
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Complete Purchase'}
                  <Send className="ml-1 h-3 w-3" />
                </Button>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuickPurchaseModal;