import React from 'react';
import { Image, StyleSheet, Text, View, Pressable, Modal } from 'react-native';
import Swiper from 'react-native-swiper';

const ProductCard = ({ data }) => {
    const [modalVisible, setModalVisible] = React.useState(false);

    const showDetails = () => {
        setModalVisible(true);
    }

    const purchasing = () => {
        console.log(id)
    }

    return (
        <>
            <Pressable onPress={showDetails}>
                <View style={styles.card}>
                    <Image source={{ uri: data.imageURL }} style={styles.cardImage} />
                    <View style={styles.cardContent}>
                        <Text style={styles.cardName}>{data.name}</Text>
                        <Text style={styles.cardCreatorName}>{data.creator}</Text>
                        <Text style={styles.cardDescription}>{data.short}</Text>

                        <Pressable style={({ pressed }) => [styles.purchaseButton, { backgroundColor: pressed ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,1)' }]} onPress={purchasing}>
                            <Text style={styles.text}>Obtenir - {data.price}€</Text>
                        </Pressable>
                    </View>
                </View>
            </Pressable>

            <Modal animationType="slide" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modal}>
                    <Swiper style={styles.carousel} loop={true}>
                        {data.gallery.map((imageUrl) => (
                            <Image key={imageUrl} source={{ uri: imageUrl }} style={styles.carouselImage} />
                        ))}
                    </Swiper>
                    <Text style={styles.modalName}>{data.name}</Text>
                    <Text style={styles.modalCreatorName}>{data.creator}</Text>
                    <Text style={styles.modalDescription}>{data.description}</Text>
                    <Text style={styles.modalPrice}>Prix: {data.price}€</Text>
                    <Text style={styles.modalPrice}>Prix: {data.score}€</Text>
                    <Pressable style={({ pressed }) => [styles.closeButton, { backgroundColor: pressed ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,1)' }]} onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeButtonText}>Fermer</Text>
                    </Pressable>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    purchaseButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    card: {
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 1,
    },
    cardImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    cardContent: {
        padding: 10,
    },
    cardName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardPrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardDescription: {
        fontSize: 14,
        paddingVertical: 8,
    },
    cardCreatorName: {
        fontSize: 10,
    },

    modal: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    modalName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333', // Matches headerTitle color
    },
    modalCreatorName: {
        fontSize: 12,
        marginBottom: 10,
    },
    modalDescription: {
        fontSize: 16,
        marginBottom: 20,
    },
    modalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    closeButton: {
        backgroundColor: 'black',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

    carousel: {
        height: 200, // Adjust carousel height as needed
    },
    carouselImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});


export default ProductCard;

