import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MainHeader } from '../components';
import { colors, typography, spacing, getShadow } from '../utils/theme';

const ContactScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      message: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        
        if (Platform.OS === 'web') {
          alert('Thank you for your message! We will get back to you soon.');
        } else {
          Alert.alert(
            'Message Sent',
            'Thank you for your message! We will get back to you soon.',
            [{ text: 'OK' }]
          );
        }
      }, 1500);
    }
  };

  return (
    <View style={styles.container}>
      <MainHeader currentScreen="Contact" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Contact Us</Text>
          <Text style={styles.subtitle}>
            Have questions or feedback? We'd love to hear from you!
          </Text>

          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.contactText}>support@bikeparkfinder.com</Text>
            </View>
            <View style={styles.contactItem}>
              <MaterialCommunityIcons
                name="phone-outline"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.contactText}>(555) 123-4567</Text>
            </View>
            <View style={styles.contactItem}>
              <MaterialCommunityIcons
                name="map-marker-outline"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.contactText}>
                123 Mountain Trail, Boulder, CO 80302
              </Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Send us a message</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={[styles.input, errors.name ? styles.inputError : null]}
                placeholder="Your name"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
              />
              {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, errors.email ? styles.inputError : null]}
                placeholder="Your email"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Subject</Text>
              <TextInput
                style={styles.input}
                placeholder="Subject (optional)"
                value={formData.subject}
                onChangeText={(text) => setFormData({ ...formData, subject: text })}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Message</Text>
              <TextInput
                style={[
                  styles.input, 
                  styles.textArea, 
                  errors.message ? styles.inputError : null
                ]}
                placeholder="Your message"
                value={formData.message}
                onChangeText={(text) => setFormData({ ...formData, message: text })}
                multiline
                numberOfLines={Platform.OS === 'ios' ? 0 : 4}
                textAlignVertical="top"
              />
              {errors.message ? <Text style={styles.errorText}>{errors.message}</Text> : null}
            </View>
            
            <TouchableOpacity
              style={[
                styles.submitButton,
                isSubmitting ? styles.submitButtonDisabled : null,
              ]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
  title: {
    fontFamily: typography.fontFamily.accent,
    fontSize: typography.fontSizes.xl,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: typography.fontFamily.secondary,
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
  contactInfo: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.lg,
    ...getShadow('small'),
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  contactText: {
    fontFamily: typography.fontFamily.secondary,
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    marginLeft: spacing.sm,
  },
  formContainer: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: spacing.md,
    ...getShadow('medium'),
  },
  formTitle: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  label: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    padding: spacing.sm,
    fontFamily: typography.fontFamily.secondary,
    fontSize: typography.fontSizes.sm,
    color: colors.text.primary,
  },
  inputError: {
    borderColor: colors.error,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  errorText: {
    fontFamily: typography.fontFamily.secondary,
    fontSize: typography.fontSizes.xs,
    color: colors.error,
    marginTop: spacing.xs,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 4,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.medium,
    color: colors.card,
  },
});

export default ContactScreen; 